import { forwardRef } from "react";
import { Loader, LucideIcon } from "lucide-react";
import { Button, ButtonProps } from "@/components/ui/button";

type LoaderButtonProps = ButtonProps & {
  isLoading?: boolean;
  icon?: LucideIcon;
  children: React.ReactNode;
  onSubmit?: () => void;
  className?: string;
};

const LoaderButton = forwardRef<HTMLButtonElement, LoaderButtonProps>(
  ({ isLoading, icon: Icon, children, onSubmit, className }, ref, ...props) => {
    if (isLoading) {
      return (
        <Button ref={ref} disabled={isLoading} className={`w-full ${className}`} {...props}>
          <Loader className="mr-2 h-4 w-4 animate-spin" />
          {children}
        </Button>
      );
    }

    return (
      <Button onClick={onSubmit} ref={ref} disabled={isLoading} className={`w-full ${className}`}>
        {Icon ? (
          <>
            <Icon size={18} className="mr-3" />
            {children}
          </>
        ) : (
          children
        )}
      </Button>
    );
  },
);
LoaderButton.displayName = "LoaderButton";

export default LoaderButton;
