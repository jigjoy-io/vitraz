import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import VisitorFactory from "./VisitorFactory";
import { focusBlock, updateBlock } from "../reducers/pageReducer";

export default function BuildingBlock(props: any) {
  const dispatch = useDispatch();
  const hasUpdated = useRef(false);

  useEffect(() => {
    if (props.type === "carousel-configurer" && props.display !== false && !hasUpdated.current) {
      const updatedBlock = {
        ...props,
        display: false
      };
      dispatch(updateBlock(updatedBlock));
      
      hasUpdated.current = true;
    }
  }, [props, dispatch]);

  // Reset the ref when the block id changes
  useEffect(() => {
    hasUpdated.current = false;
  }, [props.id]);

  return <>{VisitorFactory.getVisitingBlock(props.mode, props)}</>;
}