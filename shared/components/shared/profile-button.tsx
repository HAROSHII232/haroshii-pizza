import { CircleUser as CircleUserIcon, User as UserIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { Button, Skeleton } from "../ui";
import Link from "next/link";

type Props = {
  onClickSignIn?: VoidFunction;
  className?: string;
};

export const ProfileButton = ({ className, onClickSignIn }: Props) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className={className}>
        <Skeleton className="h-10 w-[120px] rounded-md" />
      </div>
    );
  }

  return (
    <div className={className}>
      {session ? (
        <Link href="/profile">
          <Button variant="secondary" className="flex items-center gap-2">
            <CircleUserIcon size={18} />
            Профиль
          </Button>
        </Link>
      ) : (
        <Button
          onClick={onClickSignIn}
          variant="outline"
          className="flex items-center gap-2"
        >
          <UserIcon size={16} />
          Войти
        </Button>
      )}
    </div>
  );
};
