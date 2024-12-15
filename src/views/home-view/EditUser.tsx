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
import { setUserData } from "@/services/user-service";
import { useUserStore } from "@/services/UserStore";
import InputMask from "react-input-mask";

export function EditUser({ children }) {
  let user = useUserStore((state) => state.user);
  const set_user = useUserStore((state) => state.set_user);

  const handleUserChanges = async () => {
    const new_user = await setUserData(user);
    console.log("new_user", new_user);
    if (new_user) {
      set_user(new_user);
      window.location.reload();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Perfil</DialogTitle>
          <DialogDescription>
            Haz cambios en tu perfil aquí. Haz clic en Guardar cuando hayas
            terminado.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue={user.username}
              className="col-span-3"
              onChange={(e) => set_user({ ...user, username: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              defaultValue={user.email}
              disabled
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Edad
            </Label>
            <InputMask
              mask="99"
              maskChar=""
              value={user.age}
              onChange={(e) => set_user({ ...user, age: e.target.value })}
            >
              {(inputProps) => (
                <Input
                  {...inputProps}
                  id="age"
                  className="col-span-3 w-1/3"
                  placeholder="Edad"
                />
              )}
            </InputMask>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Country
            </Label>
            <Input
              id="country"
              defaultValue={user.country}
              disabled
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleUserChanges}>Guardar Cambios</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
