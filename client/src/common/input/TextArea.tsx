import { AllHTMLAttributes, forwardRef } from "react";

interface ITextArea extends AllHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, ITextArea>(
  (props: ITextArea, ref) => {
    const { error, className, ...rest } = props;
    return (
      <div className="flex flex-col gap-1 bg-[#F1F3F4] border border-slate-300 focus-within:border-expectoo-border">
        <textarea
          ref={ref}
          {...rest}
          className={`appearance-none active:outline-none text-expectoo-shades-black placeholder-expectoo-dark-teal-60 bg-[#F1F3F4]  focus:outline-none outline-none  flex-grow border-none text-xs px-2 py-2 placeholder-point-placeholder-text text-point-label-text bg-point-input-bg ${
            className ? className : ""
          }  rounded  px-2 bg-point-input-bg border " 
            ${error ? " border-expectoo-red-500 border-solid  " : ""}`}
        />
        <small className="text-expectoo-red-500">{error}</small>
      </div>
    );
  }
);

Textarea.displayName = "TextArea";

export default Textarea;
