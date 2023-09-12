"use client";

import { ReactNode, ReactElement, Children } from "react";
import { motion } from "framer-motion";

export const StaggerChildren = ({ children, className }: { children: ReactNode, className: string }) => {
  const childrenArray = Children.toArray(children) as ReactElement[];

  const variants = {
    list: {
      hidden: { opacity: 1 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.03,
        },
      },
      remove: { opacity: 0 },
    },
    item: {
      hidden: { y: 20, opacity: 0 },
      visible: { y: 0, opacity: 1 },
      remove: { opacity: 0 },
    },
  };

  const checkEmptyObject = (object: object) => {
    return Object.keys(object).length === 0 && object.constructor === Object;
  };

  return (
    <motion.ul
      className={className}
      variants={variants.list}
      initial="hidden"
      animate="visible"
      exit="remove"
    >
      {childrenArray?.map((item) => {
        return !checkEmptyObject(item.props) ? (
          <motion.li key={item.key} variants={variants.item}>
            {item}
          </motion.li>
        ) : undefined;
      })}
    </motion.ul>
  );
};
