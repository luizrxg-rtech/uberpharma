import {LinkWithName} from "@/types/misc/types";
import {Categories} from "@/types/product/enums";

export const linksProdutos: LinkWithName[] =
  Object.values(Categories).map(category => ({
    name: category,
    url: `#${category.toLowerCase().replace('-', "")}`
  }))

export const linksEmpresa: LinkWithName[] = [
  {
    name: "Quem somos",
    url: "",
  },
  {
    name: "Política de privacidade",
    url: "",
  },
  {
    name: "Política de frete",
    url: "",
  },
  {
    name: "Política de reembolso",
    url: "",
  },
  {
    name: "Termos de serviço",
    url: "",
  },
  {
    name: "Formas de pagamento",
    url: "",
  },
]

export const linksAjuda: LinkWithName[] = [
  {
    name: "Central de ajuda",
    url: "",
  },
  {
    name: "Trocas e devoluções",
    url: "",
  },
  {
    name: "Fale conosco",
    url: "",
  },
]