import { useState } from "react";
import { Post } from "../entity/Post";
import { useUpdatePostField } from "../hooks/useUpdatePostField";

interface InlineEditFieldProps {
  postId: string;
  fieldName: keyof Post;
  initialValue: string;
}

export const InlineEditField: React.FC<InlineEditFieldProps> = ({
  postId,
  fieldName,
  initialValue
}) => {
  const { updatePostField, isLoading } = useUpdatePostField(); // Custom hook específico
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);

  const handleUpdate = async () => {
    try {
      // Llamamos directamente al caso de uso con solo el campo específico
      await updatePostField({
        postId,
        field: fieldName,
        value
      });
      setIsEditing(false);
    } catch (error) {
      // Manejar error
    }
  };

  if (!isEditing) {
    return (
      <div onClick={() => setIsEditing(true)} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded text-gray-600">
        {value}
        <svg
          className="w-4 h-4 text-gray-500 hover:text-gray-700"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleUpdate}
        disabled={isLoading}
        autoFocus
      />
      {isLoading && <img alt="spiner icon" src='' />}
    </div>
  );
}
