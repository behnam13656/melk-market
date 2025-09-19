import { p2e } from "@/utils/replaceNumber";
import styles from "./TextInput.module.css";

function TextInput({
  title,
  name,
  profileData,
  setProfileData,
  textarea = false,
  withMic = false, // اضافه شدن میکروفون
  onMicClick,      // فانکشن کلیک روی میکروفون
  isRecording = false, // حالت فعال بودن ضبط
}) {
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: p2e(value) });
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>{title}</label>

      {textarea ? (
        <div className={styles.textareaWrapper}>
          <textarea
            className={styles.textareaField}
            name={name}
            value={profileData[name]}
            onChange={changeHandler}
          />
          {withMic && (
            <button
              type="button"
              className={`${styles.micBtn} ${isRecording ? styles.recording : ""}`}
              onClick={onMicClick}
            >
              🎤
            </button>
          )}
        </div>
      ) : (
        <input
          className={styles.inputField}
          type="text"
          name={name}
          value={profileData[name]}
          onChange={changeHandler}
        />
      )}
    </div>
  );
}

export default TextInput;
