import React, { useState, useEffect } from "react";
import Canvas from "./Canvas";

const Filters = () => {
  const [allFilters, setAllFilters] = useState([
    { name: "grayscale" },
    { name: "invert" },
    { name: "sepia" },
    { name: "sepia2" },
    {
      name: "removeWhite",
      options: {
        distance: { current: 10 },
        threshold: { current: 50 },
      },
    },
    {
      name: "brightness",
      options: {
        brightness: { current: 50 },
      },
    },
    {
      name: "noise",
      options: {
        noise: { current: 40, max: 600 },
      },
    },
    {
      name: "GradientTransparency",
      displayName: "Gradient",
      options: {
        threshold: { current: 40 },
      },
    },
    {
      name: "pixelate",
      options: {
        blocksize: { max: 40, current: 2 },
      },
    },
    {
      name: "sharpen",
      uses: "Convolute",
      matrix: [0, -1, 0, -1, 5, -1, 0, -1, 0],
    },
    {
      name: "blur",
      uses: "Convolute",
      matrix: [1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9],
    },
    {
      name: "emboss",
      uses: "Convolute",
      matrix: [1, 1, 1, 1, 0.7, -1, -1, -1, -1],
    },
    {
      name: "tint",
      options: {
        opacity: { current: 0.5, min: 0.1, max: 1, step: 0.1 },
        color: { colorpicker: true, current: "#FF4081" },
      },
    },
    {
      name: "multiply",
      options: {
        color: { colorpicker: true, current: "#FF4081" },
      },
    },
    {
      name: "blend",
      options: {
        mode: {
          current: "add",
          select: true,
          available: [
            "add",
            "multiply",
            "subtract",
            "diff",
            "screen",
            "lighten",
            "darken",
          ],
        },
        alpha: { current: 0.5, min: 0.1, max: 1, step: 0.1 },
        color: { colorpicker: true, current: "#FF4081" },
      },
    },
  ]);

  const [appliedFilters, setAppliedFilters] = useState([]);
  const [lastAppliedFilter, setLastAppliedFilter] = useState(false);

  const filterExists = (filter) => {
    return fabric.Image.filters[
      fabric.util.string.capitalize(filter.uses || filter.name, true)
    ];
  };

  const filterAlreadyApplied = (name) => {
    return appliedFilters.indexOf(name) !== -1;
  };

  const markAsApplied = (name) => {
    if (appliedFilters.indexOf(name) === -1) {
      setAppliedFilters([...appliedFilters, name]);
    }
  };

  function unmarkAsApplied(name, appliedFilters) {
    const updatedFilters = appliedFilters.filter((filter) => filter !== name);
    return updatedFilters;
  }

  function filterExists(filter) {
    return (
      fabric.Image.filters[
        fabric.util.string.capitalize(filter.uses || filter.name, true)
      ] !== undefined
    );
  }

  function getFilter(filter) {
    let newFilter;

    if (filter.uses) {
      newFilter = new fabric.Image.filters[
        fabric.util.string.capitalize(filter.uses, true)
      ]({ matrix: filter.matrix });
    } else {
      const options = {};

      for (const key in filter.options) {
        options[key] = filter.options[key].current;
      }

      newFilter = new fabric.Image.filters[
        fabric.util.string.capitalize(filter.name, true)
      ](options);
    }

    newFilter.name = filter.name;

    return newFilter;
  }

  const filters = {
    unmarkAsApplied,
    filterExists,
    getFilter,
  };
};
export default filters;
