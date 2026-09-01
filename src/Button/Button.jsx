const AnimatedButton = () => {
  return (
    <button
      className="
        group relative z-0
        overflow-hidden
        rounded-[99rem]
        border-2 border-white
        bg-black
        px-12 py-3
        font-black uppercase
        leading-6 text-white
        cursor-pointer
        [tap-highlight-color:transparent]
        [-webkit-mask-image:-webkit-radial-gradient(#000,#fff)]
        
        before:pointer-events-none
        before:absolute
        before:left-[calc(-50%-50%*0.2)]
        before:top-[-104%]
        before:z-[-1]
        before:block
        before:h-[102%]
        before:w-full
        before:bg-white
        before:content-['']
        before:transform
        before:skew-[30deg]
        before:transition-transform
        before:duration-200
        before:ease-in-out
        
        after:pointer-events-none
        after:absolute
        after:left-[calc(50%+50%*0.2)]
        after:top-[102%]
        after:z-[-1]
        after:block
        after:h-[102%]
        after:w-full
        after:bg-white
        after:content-['']
        after:transform
        after:skew-[30deg]
        after:transition-transform
        after:duration-200
        after:ease-in-out
        
        hover:before:translate-y-[100%]
        hover:after:-translate-y-[102%]
      "
    >
      <span className="relative block overflow-hidden mix-blend-difference">
        <span
          className="
            relative block
            transition-none
            group-hover:animate-[move-up-alternate_0.3s_forwards]
          "
        >
          Button
        </span>
      </span>
    </button>
  );
};

export default AnimatedButton;