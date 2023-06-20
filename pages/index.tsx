import { MainLayout } from "@/components/layouts"
import Head from "next/head"

export default function Home() {
  return (
    <>
      <Head>
        <title>Inicio</title>
      </Head>
      <MainLayout>
        <main>
          <h1 className="text-4xl">Hola</h1>
        </main>
      </MainLayout>
    </>
  )
}
