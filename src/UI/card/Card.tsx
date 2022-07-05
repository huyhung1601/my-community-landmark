import React from "react";
import classes from "./Card.module.scss";
import { AiFillEdit } from "react-icons/ai";

interface IProps {
  title?: string;
  isAdmin: boolean;
  isEditable?: boolean;
  onSave?: () => void;
  onClose?: () => void;
  onEdit?: () => void;
}

export const Card: React.FC<
  IProps &
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
> = ({ children, title, onSave, onClose, isEditable, onEdit, isAdmin }) => {
  return (
    <div className={classes.card}>
      <div className={classes.card_header}>
        <p>{title}</p>
        <div className={classes.card_header_btns}>
          {isAdmin && (
            <button
              className={isEditable ? classes.editBtn_active : classes.editBtn}
              onClick={onEdit}
            >
              <AiFillEdit />
            </button>
          )}
          <button className={classes.closeBtn} onClick={onClose}>
            X
          </button>
        </div>
      </div>
      <div className={classes.card_content}>{children}</div>
      {isEditable && (
        <div className={classes.card_footer}>
          <button onClick={onSave}>Save</button>
          <button onClick={onClose}>Close</button>
        </div>
      )}
    </div>
  );
};
