import React, { useState } from "react";
import { TBoard, TColumn, TCard } from "./data";

import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

type BoardProps = {
    initial: TBoard;
};

const Board = ({ initial }: BoardProps) => {
    const [board, setBoard] = useState<TBoard>(initial)

    return (
        <div>

        </div>
    )
}

con