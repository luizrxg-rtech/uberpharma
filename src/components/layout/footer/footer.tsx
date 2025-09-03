import {Box, SimpleGrid, VStack} from "@chakra-ui/react";
import Info from "./info";
import LinkList from "./link-list";
import Baseline from "./baseline";
import {linksAjuda, linksEmpresa, linksProdutos} from './links'

export default function Footer() {
  return (
    <VStack
      as="footer"
      fontSize="sm"
      color="fg.muted"
      w="full"
    >
      <Box className="footer-line"/>
      <SimpleGrid columns={6} className="w-full max-w-7xl" py={12}>
        <Info/>
        <LinkList title="Produtos" links={linksProdutos}/>
        <LinkList title="Empresa" links={linksEmpresa}/>
        <LinkList title="Ajuda" links={linksAjuda}/>
      </SimpleGrid>
      <Baseline/>
    </VStack>
  );
}
