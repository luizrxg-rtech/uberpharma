import {Box, SimpleGrid, VStack} from "@chakra-ui/react";
import Info from "./info/info";
import LinkList from "./link-list/link-list";
import Baseline from "./baseline/baseline";
import {LinkWithName} from "@/types/misc/types";
import {Categories} from "@/types/product/enums";

const linksProdutos: LinkWithName[] =
  Object.values(Categories).map(category => ({
    name: category,
    url: `#${category.toLowerCase().replace('-', "")}`
  }))

const linksEmpresa: LinkWithName[] = [
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

const linksAjuda: LinkWithName[] = [
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

export default function Footer() {
  return (
    <VStack
      as="footer"
      fontSize="sm"
      color="fg.muted"
      fontWeight="medium"
      w="100%"
    >
      <Box
        className="footer-line"
      />
      <SimpleGrid columns={6} className="w-full max-w-7xl" py={12}>
        <Info/>
        <LinkList title="Produtos" links={linksProdutos}/>
        <LinkList title="Empresa" links={linksEmpresa}/>
        <LinkList title="Ajuda" links={linksAjuda}/>
      </SimpleGrid>
      <Baseline />
    </VStack>
  );
}
