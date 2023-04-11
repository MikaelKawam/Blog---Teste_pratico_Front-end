import React, { useState, useEffect } from "react";
import { canvas, filters } from "./dependencies"; // assuming these dependencies are already imported

const FiltersController = () => {
  const [appliedFilters, setAppliedFilters] = useState([]);

  useEffect(() => {
    const historyLoadedHandler = () => {
      if (!canvas.mainImage) return;
      const newAppliedFilters = canvas.mainImage.filters.map(
        (filter) => filter.name
      );
      setAppliedFilters(newAppliedFilters);
    };

    const unsubscribe = $rootScope.$on("history.loaded", historyLoadedHandler);

    return () => {
      unsubscribe();
    };
  }, []);

  return <div>{/* render the filters with appliedFilters */}</div>;
};

export default FiltersController;
