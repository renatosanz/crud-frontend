import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { EditUser } from "./EditUser";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function HomeMenu() {
  const navgate = useNavigate();
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Recetas</MenubarTrigger>
        <MenubarContent>
          <MenubarItem
            onClick={() => {
              navgate("/recipes/upload");
            }}
          >
            Subir receta
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Perfil</MenubarTrigger>
        <MenubarContent>
          <EditUser>
            <Button className="w-full" variant="ghost">
              Editar perfil
            </Button>
          </EditUser>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
