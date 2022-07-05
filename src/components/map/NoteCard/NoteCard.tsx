import React from "react";
import { ILandmark } from "../../../context/landmarksContext/LandmarksContext";
import { Card } from "../../../UI";
import classes from "./NoteCard.module.scss";

interface IProps {
  landmarkNote: ILandmark;
  isEditable: boolean;
  onEdit: () => void;
  onSave: () => void;
  onClose: () => void;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const NoteCard: React.FC<IProps> = ({
  landmarkNote,
  isEditable,
  onEdit,
  onSave,
  onClose,
  onChange,
}) => {
  return (
    <Card
      isAdmin={landmarkNote.username === "Admin"}
      onEdit={onEdit}
      onSave={onSave}
      onClose={onClose}
      title={landmarkNote.username}
      isEditable={isEditable}
    >
      <div className={classes.noteContent}>
        {!isNaN(landmarkNote.lat) && !isNaN(landmarkNote.lng) && (
          <>
            <p>
              lat:
              {landmarkNote.lat
                .toString()
                .split("")
                .map((l, i) => i < 8 && <span key={i}>{l}</span>)}
              ...
            </p>
            <p>
              lng:{" "}
              {landmarkNote.lng
                .toString()
                .split("")
                .map((l, i) => i < 8 && <span key={i}>{l}</span>)}
              ...
            </p>
          </>
        )}
        {isEditable && landmarkNote.username === "Admin" ? (
          <textarea
            name="note"
            value={landmarkNote.note}
            onChange={onChange}
            className={classes.noteInput}
            rows={3}
          />
        ) : (
          <div className={classes.noteBox}>
            <p>{landmarkNote.note}</p>
          </div>
        )}
      </div>
    </Card>
  );
};
