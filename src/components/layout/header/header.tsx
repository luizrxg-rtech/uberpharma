"use client"

import {TextField} from "@/components/ui/text-field";
import {useState} from "react";
import {IconSearch} from "@tabler/icons-react";
import {useRouter} from "next/router";

export default function Header() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");

  document.querySelector("#search")?.addEventListener("onKeyDown", (e) => {
    console.log(e)
  })

  return (
    <header className="">
      <TextField
        id="search"
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Pesquisar produtos"
        startElement={<IconSearch/>}
      />
    </header>
  );
}
