import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { deepCopy } from "@/lib/utils";
import { updateUserData } from "@/services/user-service";
import { useUserStore } from "@/services/UserStore";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";

export function EditUser({ children }) {
  const [user_temporal, set_user_temporal] = useState(
    deepCopy(useUserStore((state) => state.user))
  );

  const set_user = useUserStore((state) => state.set_user);

  const handleUserChanges = (event) => {
    updateUserData(user_temporal).then((user) => set_user(user));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" onCloseAutoFocus={() => {}}>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click Save when you're finished.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue={user_temporal?.username}
              className="col-span-3"
              autoComplete="off"
              maxLength={20}
              minLength={2}
              onChange={(e) =>
                set_user_temporal({
                  ...user_temporal,
                  username: e.target.value,
                })
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              defaultValue={user_temporal?.email}
              disabled
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Country
            </Label>
            <Input
              id="country"
              defaultValue={user_temporal?.country}
              disabled
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="age" className="text-right">
              Age
            </Label>
            <Input
              id="age"
              type="number"
              defaultValue={user_temporal?.age}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button onClick={handleUserChanges}>Save</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
