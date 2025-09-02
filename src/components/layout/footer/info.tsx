import {HStack, Text, VStack} from "@chakra-ui/react";
import Image from "next/image";
import {IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandTiktok} from "@tabler/icons-react";

export default function Info() {
  return (
    <VStack
      align="start"
      className="col-span-3"
      maxW="400px"
      gap={8}
    >
      <Image
        src="/logo.png"
        alt="Logo"
        width={781}
        height={184}
        className="cursor-pointer h-10 w-auto"
        loading="lazy"
      />
      <Text>
        Fundada em 2008, a UberPharma oferece produtos farmacêuticos que
        promovem saúde e bem-estar. Combinamos tecnologia e ingredientes
        naturais para criar soluções de qualidade nas áreas estética, nutricional e
        terapêutica. Estamos presentes em mais de 20 estados, com um portfólio de
        mais de 60 produtos aprovados por especialistas.
      </Text>
      <HStack gap={4}>
        <IconBrandFacebook
          strokeWidth={1.2}
          size={40}
        />
        <IconBrandInstagram
          strokeWidth={1.2}
          size={40}
        />
        <IconBrandTiktok
          strokeWidth={1.2}
          size={40}
        />
        <IconBrandLinkedin
          strokeWidth={1.2}
          size={40}
        />
      </HStack>
      <Text>
        Estrada Municipal Thereza Thomazella,  432, Distrito Industrial Pires, Minas Gerais - MG CEP 37642-564. <br/>
        CNPJ: 58.342.281/0001-40
      </Text>
      <Text>
        Feito com ❤️ por RTech.
      </Text>
    </VStack>
  )
}