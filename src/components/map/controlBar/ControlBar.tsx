import classes from "./ControlBar.module.scss";
import { TbCurrentLocation, TbSearch } from "react-icons/tb";

interface IProps {
  navigateMe: () => void;
  search: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  clearSearch: () => void;
}

export const ControlBar: React.FC<IProps> = ({
  search,
  navigateMe,
  handleSearchChange,
  onSearch,
  clearSearch,
}) => {
  return (
    <div className={classes.controlBar}>
      <button onClick={navigateMe} className={classes.navigate_btn}>
        <TbCurrentLocation />
      </button>
      <div onClick={onSearch} className={classes.searchBar}>
        <button className={classes.searchBar_btn}>
          <TbSearch />
        </button>
        <input
          name="search"
          value={search}
          onChange={handleSearchChange}
          placeholder="search"
          className={classes.searchBar_input}
          type="text"
        />
        <button onClick={clearSearch} className={classes.clearSearch_btn}>
          x
        </button>
      </div>
    </div>
  );
};
