
const ProgressiveImg = ({ placeholderSrc, src }:{ placeholderSrc: string, src: string }) => {
    return (
      <img
        className="image"
        alt={src}
        placeholder={placeholderSrc}
        width={360}
        height={280}
        src={src}
      />
    );
  };
  export default ProgressiveImg;