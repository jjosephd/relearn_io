import React from 'react';

const Card = ({
  title,
  description,
  imgUrl,
}: {
  title: string;
  description: React.ReactNode;
  imgUrl: string;
}) => {
  return (
    <div className="mb-2">
      <div className="card border-2 border-gray-300/10 shadow-slate-50/10 shadow-lg  p-2 rounded-lg  max-w-[350px] max-h-[420px] font-extralight ">
        <figure className="mb-12">
          <img
            src={imgUrl}
            alt="Generated Learn"
            className="w-full h-64 object-cover faded-section"
          />
        </figure>

        <div className="flex flex-col justify-center p-1.5 ">
          <h1 className="card-title text-md font-extralight mb-4 line-clamp-2 ">
            {title}
          </h1>
          <div className=" text-sm text-slate-50/80 mb-2 line-clamp-2 overflow-auto">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
