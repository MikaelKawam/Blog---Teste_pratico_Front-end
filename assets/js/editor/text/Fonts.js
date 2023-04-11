"use strict";

import React, { useEffect } from "react";
import fonts from "./fonts";

const EdFontsPagination = () => {
  useEffect(() => {
    const el = document.querySelector("[ed-fonts-pagination]");
    //initiate pagination plugin
    el.pagination({
      items: 0,
      itemsOnPage: fonts.paginator.perPage,
      onPageClick: function (num) {
        $scope.$apply(function () {
          fonts.paginator.selectPage(num);
        });
      },
    });

    //redraw pagination bar on total items change
    $scope.$watch("fonts.paginator.totalItems", function (value) {
      if (value) {
        el.pagination("updateItems", value);
      }
    });
  }, []);

  return <div ed-fonts-pagination>// Pagination content goes here</div>;
};

const Fonts = () => {
  const getAllFonts = () => {
    var self = this,
      cached = localStorage.get("googleFonts"),
      key = $rootScope.keys["google_fonts"];

    if (cached) {
      self.paginator.sourceItems = cached;
      return filters
        ? self.paginator.filter(filters)
        : self.paginator.start(cached);
    }

    $http
      .get(
        "https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=" +
          key
      )
      .success(function (data) {
        localStorage.set("googleFonts", data.items);
        self.paginator.sourceItems = data.items;
        filters
          ? self.paginator.filter(filters)
          : self.paginator.start(data.items);
      });
  };

  const loadFonts = (names) => {
    const head = document.querySelector("head");
    $rootScope.loading = true;

    //make an array of font names from current fonts
    //in the paginator if none passed
    if (!names) {
      names = $.map(fonts.paginator.currentItems, function (font) {
        return font.family;
      });

      //normalize names to array if string passed
    } else if (!angular.isArray(names)) {
      names = [names];
    }

    //remove previous page fonts
    $(head).find("#dynamic-fonts").remove();

    //load the given fonts
    head.append(
      '<link rel="stylesheet" id="dynamic-fonts" href="http://fonts.googleapis.com/css?family=' +
        names.join("|").replace(/ /g, "+") +
        '">'
    );

    $rootScope.loading = false;
  };

  const createLinkToFont = (font) => {
    var name = font.replace(/ /g, "+"),
      link = $("#" + name);

    if (link[0]) {
      link.attr("href", "http://fonts.googleapis.com/css?family=" + name);
    } else {
      $("head").append(
        '<link rel="stylesheet" id="' +
          name +
          '" href="http://fonts.googleapis.com/css?family=' +
          name +
          '">'
      );
    }
  };

  return { getAllFonts, loadFonts, createLinkToFont };
};

export default Fonts;
