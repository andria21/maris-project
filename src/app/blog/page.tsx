import Image from "next/image";
import React from "react";

function Blog() {
  return (
    <div className="w-full flex flex-col">
      <h1 className="pt-40 pl-6 text-5xl md:text-7xl font-bold font-montserrat md:text-left text-center">
        About Me
      </h1>
      <section className="flex flex-col justify-between md:gap-16 gap-8">
        <div className="grid md:grid-cols-2 grid-cols-1 place-content-center items-center justify-center text-center pt-20 md:gap-0 gap-8">
          <p className="px-18 text-gray-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
            laboriosam eligendi totam inventore beatae autem hic animi
            voluptatibus, ab, ducimus ratione velit error quod sed,
            necessitatibus corrupti itaque neque officiis?
          </p>
          <Image
            src={
              "https://images.unsplash.com/photo-1562438668-bcf0ca6578f0?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            width={10000}
            height={10000}
            alt="Blog Image"
            className="object-contain w-[80%] h-full rounded-2xl mx-auto"
          />
        </div>
        <div className="md:grid md:grid-cols-2 flex flex-col-reverse place-content-center items-center justify-center text-center pt-20 pb-40 md:gap-0 gap-8">
          <Image
            src={
              "https://images.unsplash.com/photo-1562438668-bcf0ca6578f0?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            width={10000}
            height={10000}
            alt="Blog Image"
            className="object-contain w-[80%] h-full rounded-2xl mx-auto"
          />
          <p className="px-18 text-gray-300">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio
            laudantium fuga excepturi possimus temporibus eius esse numquam
            praesentium debitis? Eius veritatis officiis earum velit quidem,
            aliquid neque facilis quis suscipit?
          </p>
        </div>
      </section>
    </div>
  );
}

export default Blog;
