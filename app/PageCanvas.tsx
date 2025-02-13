"use client"
import { ReactNode } from "react";
import { findSlotOfType } from "./tools/global-tools";


type PropsType = {
  children: ReactNode,
  title?: string,
  disableContentPadding?: boolean
}

function Title({ children }: any) {
  return <>{children}</>;
}

function Actions({ children }: any) {
  return <div>{children}</div>;
}

function Content({ children }: any) {
  return <div>{children}</div>;
}

function SideContent({ children }: any) {
  return <div>{children}</div>;
}

const PageCanvas = ({ children, title, disableContentPadding = false }: PropsType) => {
  const TitleComponent = findSlotOfType(children, Title);
  const ContentComponent = findSlotOfType(children, Content);
  const ActionsComponent = findSlotOfType(children, Actions);
  const SideContentComponent = findSlotOfType(children, SideContent);

  const shouldDisplayTopPart =
    title !== undefined || TitleComponent !== undefined || ActionsComponent !== undefined;

  return (
    <div
      className={
        SideContentComponent
          ? "grid grid-cols-[300px_minmax(300px,_1fr)] border-l-1 border-t-1 p-2 gap-x-2 h-full"
          : ""
      }
    >
      {SideContentComponent && (
        <div className="p-4 bg-pz-blue bg-opacity-20 shadow-sm rounded-md">{SideContentComponent}</div>
      )}
      <div className={`p-frame container ${disableContentPadding ? '!p-0' : ''}`}>
        {shouldDisplayTopPart && (
          <div className="flex justify-between items-center">
            <div>
              {title && <h1 className="my-0">{title}</h1>}
              {TitleComponent}
            </div>
            <div className="my-4">{ActionsComponent}</div>
          </div>
        )}
        <div className={!shouldDisplayTopPart ? "mb-4" : ""}>
          {ContentComponent}
        </div>
      </div>
    </div>
  );
};

export default Object.assign(PageCanvas, {
  Title,
  Content,
  Actions,
  SideContent,
});
