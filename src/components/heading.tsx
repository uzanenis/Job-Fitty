import { cn } from "@/lib/utils";

type HeadingProps = {
  title: string;
  description?: string;
  centered?: boolean;
};

const Heading = ({ title, description, centered }: HeadingProps) => {
  return (
    <div className={cn({ "text-center": centered })}>
      {title && (
        <h2 className="text-2xl md:text-4xl font-special font-bold tracking-tight text-primary">
          {title}
        </h2>
      )}
      {description && (
        <p className="text-sm md:text-base mt-1 text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
};

export default Heading;
