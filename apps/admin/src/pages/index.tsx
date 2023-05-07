// import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";

import { api } from "~/utils/api";

const CreateLibraryForm: React.FC = () => {
  // const utils = api.useContext();

  // const [dir, setDir] = useState("");

  // const { mutate } = api.library.create.useMutation({
  //   async onSuccess() {
  //     await utils.library.all.invalidate();
  //   },
  // });

  return (
    <div className="my-4">
      <label htmlFor="my-modal" className="btn">
        添加素材库
      </label>

      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="border-b border-base-200 pb-4 text-lg font-bold">
            添加素材库
          </h3>
          <p className="my-4 flex items-center justify-between ">
            <span className="block w-1/4 flex-shrink-0">路径</span>
            <input
              className="input-bordered input w-full"
              placeholder="本地计算机上素材库的路径"
            />
          </p>
          <p className="my-4 flex items-center justify-between">
            <span className="block w-1/4 flex-shrink-0">素材库名字</span>
            <input
              className="input-bordered input w-full"
              placeholder="默认为文件夹名字"
              disabled
            />
          </p>
          <p className="my-4 flex items-center justify-between">
            <span className="block w-1/4 flex-shrink-0">来源App</span>
            <div className="tabs tabs-boxed ">
              <a className="tab">Eagle</a>
              <a className="tab tab-active">Pixcall</a>
              <a className="tab">Billfish</a>
            </div>
          </p>
          <div className="modal-action">
            <label htmlFor="my-modal" className="btn-outline btn">
              取消
            </label>

            <label className="btn">添加</label>
          </div>
        </div>
      </div>
    </div>
  );
};

const Home: NextPage = () => {
  const postQuery = api.library.all.useQuery();

  return (
    <>
      <Head>
        <title>Rao Pics Admin</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-base-200">
        <div className="navbar bg-base-100 shadow-sm">
          <div className="navbar-start"></div>
          <div className="navbar-center">
            <a className="btn-ghost btn text-xl normal-case">Rao Pics Admin</a>
          </div>
          <div className="navbar-start"></div>
        </div>
        <div className="container mx-auto">
          <CreateLibraryForm />

          {postQuery.data ? (
            <div>
              {postQuery.data?.length === 0 ? (
                <span>没有库！</span>
              ) : (
                <div className="grid grid-cols-3 gap-4">
                  {postQuery.data?.map((p) => {
                    return (
                      <div
                        key={p.id}
                        className="card glass border bg-base-100 shadow"
                      >
                        <div className="card-body">
                          <h2 className="card-title flex justify-between">
                            {p.name}
                            <span className=" capitalize text-primary">
                              {p.type}
                            </span>
                          </h2>
                          <p className="flex justify-between">
                            素材库地址<span>{p.location}</span>
                          </p>
                          <p className="flex justify-between">
                            监听状态<span>{p.location}</span>
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;