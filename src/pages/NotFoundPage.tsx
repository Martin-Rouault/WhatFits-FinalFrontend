import { NotFoundMagnetic } from "@/components/motion/not-found/magnetic";

export function NotFoundPage() {
  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
      <NotFoundMagnetic
        code="404"
        title="Page not found"
        description="The page you're looking for doesn't exist or has been moved."
        homeHref="/"
        homeLabel="Go Home"
        browseHref="/feed"
        browseLabel="Browse Feed"
      />
    </div>
  );
}

export default NotFoundPage;
