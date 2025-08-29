"use client"

import {useParams} from "next/navigation";
import {useState} from "react";

export default function Product() {
  const { query } = useParams();

  const [searchQuery, setSearchQuery] = useState(query);

  return (
    <div className="">

    </div>
  );
}
