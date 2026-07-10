import { cn } from "@/lib/utils";

export default function Wrapper({
  as: Component = "div",
  className,
  children,
  ...props
}) {
  return (
    <Component 
      className={cn("w-full lg:max-w-7xl lg:flex lg:flex-row mx-auto px-4 py-20 lg:py-40", className)} 
      {...props}
    >
      {children}
    </Component>
  );
}