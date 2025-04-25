import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [searchStr, setSearchStr] = useState("");
  const navigate = useNavigate();
  const handleSearch = async () => {
    //TODO: crear las busquedas
    navigate(`/search/${searchStr}`);
  };
  return (
    <div className="flex flex-row w-full gap-3">
      <Input
        placeholder="Buscar"
        id="search_input"
        onChange={(e) => setSearchStr(e.target.value)}
      />
      <Button variant="outline" onClick={handleSearch}>
        <Search className="m-auto w-full" />
      </Button>
    </div>
  );
}
