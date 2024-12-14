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

export function HomeMenu() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Archivo</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Subir archivo</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Perfil</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Editar perfil</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
