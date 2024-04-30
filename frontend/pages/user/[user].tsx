import MainLayout from "@/components/layouts/MainLayout";
import { ChangeEvent, FC, useState } from "react";
import Modal from "react-modal";


const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "transparent",
  },
};

type NFTData = {
  title: string;
  media: media[];
};

type media = {
  gateway: string;
};

const UserPage: NextPage<{
  user: User;
  isEditable: boolean;
  userNfts: NFTData[];
}> = ({ isEditable, user, userNfts }) => {
  const [modalOpen, setModalOpen] = useState(false);
  console.log(userNfts);

  return (
    <MainLayout>
      <section>
        <div
          style={{
            backgroundImage: `url(${user.bannerImage})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="h-[300px] w-full relative overflow-visible bg-cover bg-center"
        >
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-12vh] flex flex-col items-center">
            <div
              style={{
                backgroundImage: `url(${user.profileImage})`,
              }}
              className="w-20 h-20 bg-contain rounded-full "
            ></div>
            <h3>
              {user.userName === user.address
                ? shortenAddress(user.address)
                : user.userName}
            </h3>
            <p>{user.description}</p>
            <div className="flex gap-3">
              <p>Following: 0</p>
              <p>Followers: 0</p>
            </div>
            {isEditable && (
              <button onClick={() => setModalOpen(!modalOpen)}>
                Edit profile
              </button>
            )}
          </div>
        </div>
      </section>
      <div className="divider mt-[14vh]"></div>
      <section className=" mx-10 flex items-center gap-5 flex-wrap mt-10">
        {userNfts.map((nft) => (
          <div className="card w-[250px] bg-base-100 shadow-xl">
            <figure>
              <img
                src={nft.media[0].gateway}
                alt={`imagen del nft ${nft.title}`}
              />
            </figure>
            <div className="card-body">
              <p>{nft.title}</p>
            </div>
          </div>
        ))}
      </section>
      <Modal
        isOpen={modalOpen}
        style={customStyles}
        onRequestClose={() => setModalOpen(!modalOpen)}
      >
        <EditUserForm closeModal={setModalOpen} />
      </Modal>
    </MainLayout>
  );
};

export default UserPage;

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps, NextPage } from "next";
import { withSessionSsr } from "@/utils/ironSession";
import { PrismaClient, User } from "@prisma/client";
import { shortenAddress } from "@/utils/address";
import axios from "axios";

export const getServerSideProps: GetServerSideProps = withSessionSsr(
  async (ctx) => {
    const prisma = new PrismaClient(); 
    const userAddress = ctx.req.session.user?.address;

    const userData = await prisma.user.findUnique({
      where: {
        address: (ctx.query.user as string) || "",
      },
    });

    if (!userData) {
      return {
        redirect: {
          destination: "/404",
          permanent: false,
        },
      };
    }

    const { data } = await axios.get(
      `https://eth-mainnet.g.alchemy.com/nft/v2/${process.env.ALCHEMY_API_KEY}/getNFTs?owner=0xa64eeA6462463455807cdA93159aDfAa44B63dca`
    );
   
    return {
      props: {
        user: userData,
        isEditable: userAddress === ctx.query.user,
        userNfts: data.ownedNfts,
      },
    };
  }
);

interface Props {
  closeModal: (newState: boolean) => void;
}

const EditUserForm: FC<Props> = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    description: "",
    pImg: "",
    bgImg: "",
    userName: "",
  });

  const updateForm = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const updateUser = await fetch("/api/user/editProfile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });

      console.log(updateUser);
      closeModal(false);
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <section className="max-w-[80%] w-[700px] max-h-[90vh] overflow-y-scroll bg-primary m-auto my-5 rounded-md p-5">
      <p className="text-2xl">Editar info de usuario</p>
      <form className="max-w-[80%] m-auto my-5">
        <div className="flex flex-col">
          {formData.description != "" && <label>Descripción</label>}
          <label>Descripcion:</label>
          <input
            name="description"
            type="text"
            onChange={(e) => updateForm(e)}
            className="input input-primary mb-5"
            placeholder="Descripción"
            value={formData.description}
          ></input>
        </div>
        <div className="flex flex-col">
          <label>Nombre de usuario:</label>
          <input
            name="userName"
            type="text"
            onChange={(e) => updateForm(e)}
            className="input input-primary mb-5"
            placeholder="username"
            value={formData.userName}
          ></input>
        </div>
        <div className="flex flex-col">
          <label>Imagen de perfil</label>
          <input
            name="pImg"
            type="text"
            onChange={(e) => updateForm(e)}
            className="input input-primary mb-5"
            placeholder="Imagen de perfil"
            value={formData.pImg}
          ></input>
        </div>
        <div className="flex flex-col">
          <label>Imagen de fondo</label>
          <input
            name="bgImg"
            type="text"
            onChange={(e) => updateForm(e)}
            className="input input-primary mb-5"
            placeholder="Imagen de fondo"
            value={formData.bgImg}
          ></input>
        </div>
        <button onClick={handleSubmit}>Actualizar</button>
      </form>
    </section>
  );
};

