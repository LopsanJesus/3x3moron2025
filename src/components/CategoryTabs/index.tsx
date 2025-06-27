import { Category } from "@/types";
import { validCategories } from "@/utils/transformData";

import "./styles.scss";

type Props = {
  activeCategory: Category;
  onChange: (cat: Category) => void;
};

const CategoryTabs = ({ activeCategory, onChange }: Props) => {
  return (
    <div className="category-tabs">
      {validCategories.map((cat) => (
        <button
          key={cat}
          className={`tab-button ${cat} ${
            cat === activeCategory ? "active" : ""
          }`}
          onClick={() => onChange(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
