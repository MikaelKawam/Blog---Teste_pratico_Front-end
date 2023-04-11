import React, { useEffect } from 'react';
import $ from 'jquery';

function EdStickersCategories({ activeTab, setActiveCategory }) {
  useEffect(() => {
    if (activeTab !== 'stickers') return;

    const cat = $('.category-stickers.open');
    cat.find('img').each(function() {
      this.src = this.dataset.src;
    });
    cat.parent().addClass('loaded');
  }, [activeTab]);

  function handleCategoryClick(e) {
    setActiveCategory(e.target.dataset.name);

    const category = $(e.currentTarget).parent();
    if (!category.hasClass('loaded')) {
      category.addClass('loaded').find('img').each(function() {
        this.src = this.dataset.src;
      });
    }
  }

  return (
    <div ed-stickers-categories>
      {/* Render your component here */}
      <button className="category-header" data-name="category1" onClick={handleCategoryClick}>
        Category 1
      </button>
      <button className="category-header" data-name="category2" onClick={handleCategoryClick}>
        Category 2
      </button>
      {/* More categories */}
    </div>
  );
}

export default EdStickersCategories;
