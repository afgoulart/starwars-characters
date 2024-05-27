interface PictureProps {
  imgSm?: string;
  imgMd: string;
  imgLg?: string;
  imgXLg?: string;
  imgDefault?: string;
}

export const Picture = ({
  imgDefault,
  imgSm,
  imgMd,
  imgLg,
  imgXLg,
}: PictureProps) => {
  if (!imgDefault) imgDefault = imgMd;

  return (
    <picture className="w-1/3 flex max-h-36 ">
      {imgSm && (
        <source
          srcSet={`${imgSm} `}
          className="w-full"
          media="(max-width: 719px)"
        />
      )}
      {imgMd && (
        <source
          srcSet={`${imgMd} `}
          className="w-full"
          media="(min-width: 720px)"
        />
      )}
      {imgLg && (
        <source
          srcSet={`${imgLg} `}
          className="w-full"
          media="(min-width: 1200px)"
        />
      )}
      {imgXLg && (
        <source
          srcSet={`${imgXLg} `}
          className="w-full"
          media="(min-width: 1500px)"
        />
      )}
      <img src={imgDefault} alt="photo" className="w-full" />
    </picture>
  );
};
