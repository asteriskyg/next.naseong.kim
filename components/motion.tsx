"use client";

import { ReactNode, ReactElement, Children } from "react";
import { motion } from "framer-motion";

export const StaggerChildren = ({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) => {
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
    <motion.div
      className={className}
      variants={variants.list}
      initial="hidden"
      animate="visible"
      exit="remove"
    >
      {childrenArray?.map((item) => {
        return !checkEmptyObject(item.props) ? (
          <motion.div key={item.key} variants={variants.item}>
            {item}
          </motion.div>
        ) : undefined;
      })}
    </motion.div>
  );
};

export const MouseHover = ({ children }: { children: ReactNode }) => {
  const variants = {
    initial: {
      scale: 1,
      filter: "saturate(1)",
    },
    hover: {
      scale: 1.05,
      filter: "saturate(2)",
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      whileHover="hover"
      whileTap="hover"
    >
      {children}
    </motion.div>
  );
};
