export default function TranscriptionItem({
    item,
    handleStartTimeChange,
    handleEndTimeChange,
    handleContentChange,
  }) {
    if (!item) {
      return '';
    }
    return (
      <div className="my-1 grid grid-cols-3 gap-1 items-center">
        <input type="text"
               className="bg-[--color-info-primary-hover] p-1 rounded-md text-white"
               value={item.start_time}
               onChange={handleStartTimeChange}
        />
        <input type="text"
               className="bg-[--color-info-primary-hover] p-1 rounded-md text-white"
               value={item.end_time}
               onChange={handleEndTimeChange}
        />
        <input type="text"
               className="bg-[--color-info-primary-hover] p-1 rounded-md text-white"
               value={item.content}
               onChange={handleContentChange}
        />
      </div>
    );
  }