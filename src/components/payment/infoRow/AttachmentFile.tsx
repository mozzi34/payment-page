import 'styles/payment/AttachmentFile.css';

export function AttachmentFile({ files }: { files: string[] }) {
  return (
    <div className="attachment-file-container">
      {files.map(file => (
        <button
          key={file}
          type="button"
          className="attachment-file-item"
          onClick={() => {
            window.open(file, '_blank');
          }}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              window.open(file, '_blank');
            }
          }}
        >
          {file}
        </button>
      ))}
    </div>
  );
}
