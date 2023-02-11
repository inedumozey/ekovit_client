import { useContext, useEffect, useState } from 'react'
import { ContextData } from '../../contextApi/ContextApi';
import styled from 'styled-components'
import Modal from '../../utils/components/Modal';
import MenuIcon from '@mui/icons-material/Menu';
import NavLinks from '../utils/NavLinks';
import UserLog from '../utils/UserLog';
import Logo from '../utils/Logo';
import SideBarLayoutLanding from '../utils/SideBarLayoutLanding';
import SideLink from '../utils/SideLink';
import LightDarkBtn from '../../utils/components/LightDarkBtn';
import { useRouter } from 'next/router'
import ResolveClass from '../../utils/resolveClass';
const resolve = new ResolveClass()

export default function Landing({ children, toggleState, toggle }) {
    const router = useRouter()
    const [openSideDrawal, setOpenSideDeawal] = useState(false)

    return (
        <Wrapper>
            <Header toggleState={toggleState}>
                <div className="top">
                    <div className='toggle' onClick={() => setOpenSideDeawal(!openSideDrawal)}><MenuIcon className='icon' /></div>
                    <Logo />

                    <NavLinks toggleState={toggleState} />

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <UserLog toggleState={toggleState} toggle={toggle} />
                        <div className="theme-btn">
                            <LightDarkBtn toggleState={toggleState} toggle={toggle} />
                        </div>
                    </div>
                </div>
                <div className="bottom">
                    <div className="content">{resolve.path(router)}</div>
                </div>

            </Header>
            <Main>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum ullam culpa officiis corporis repudiandae, dolorem libero! Laborum soluta, quidem omnis ullam itaque voluptatum porro cum aut velit nostrum eaque ducimus doloribus iusto, nihil voluptate voluptatem ratione blanditiis minima veniam sed repellendus, beatae eum sunt in? Ducimus repudiandae illo ea animi fugiat officiis molestias? Quasi possimus aspernatur commodi aperiam doloremque incidunt, cumque fugiat voluptatibus blanditiis consectetur, excepturi corrupti. Velit iste repellendus possimus aut! Quasi cum vel doloremque pariatur architecto debitis vero, dolorem iure qui maiores aut magni error in quam voluptates mollitia illum deserunt quibusdam a libero voluptatem incidunt! Placeat, nihil nobis, sed eius vel accusamus non beatae odio labore ipsam obcaecati earum necessitatibus excepturi. Voluptatibus voluptate atque laborum asperiores vel explicabo, soluta molestiae expedita sapiente magnam repellat, quam excepturi impedit eaque facere, aperiam amet saepe optio a delectus cum iusto maiores molestias neque? Unde cumque illum, excepturi autem nam facilis beatae sapiente expedita. Quas eum iusto dolores quae expedita necessitatibus nam officiis exercitationem quidem odio illum delectus facilis ea veniam illo perspiciatis numquam sunt quod sint, perferendis odit? Praesentium voluptatum debitis, facere dolore sequi perferendis vero, ipsum est cupiditate iste quisquam alias inventore, quidem asperiores magnam ratione quae blanditiis unde! Assumenda autem nam, quia error excepturi debitis perspiciatis exercitationem quae aspernatur tempore veritatis ut in! Maiores fugiat illo, dolore dolor fuga consequatur sint officiis omnis impedit. Repellat a dolores iste ratione, fugit ipsam. Dolore placeat deserunt sapiente velit repellat et alias asperiores. Error esse vitae corporis sint et nemo soluta dolore autem nobis non. At nihil est accusantium nam suscipit impedit? Consequuntur magnam ipsam distinctio facilis labore. Eveniet distinctio, quos fugit modi, sed officiis ut ducimus dignissimos pariatur nostrum, cumque vel accusamus. Beatae veritatis repudiandae facere voluptas consectetur expedita placeat repellat, voluptatem hic! Magnam fugit quo eos nam et quisquam culpa nihil sunt hic earum nobis adipisci asperiores a magni tempore distinctio doloribus natus reprehenderit consectetur quod ipsam, dolore molestiae cum beatae? Voluptatum autem quod dolorem. Minus sapiente iste cum dignissimos minima officiis, labore magnam qui rem fugiat similique odio quis, enim aperiam pariatur dolorum eum deserunt! Velit voluptates ducimus fugiat commodi reiciendis minus totam voluptate, molestiae magni tenetur! Ipsum iste possimus aperiam sint hic dolorum totam ex labore ullam. Minus, dolores, error placeat aut nisi eveniet ad ipsum enim perferendis necessitatibus eius. Corrupti magnam voluptatum placeat. Repellat nam tempora itaque quis rerum corrupti optio voluptate error ipsam, similique doloremque exercitationem laborum eveniet repellendus, autem minus suscipit iure accusamus, distinctio aut. Vel inventore quia quaerat doloremque dolore saepe expedita labore reprehenderit omnis ducimus ipsam quidem enim incidunt illum nesciunt eum provident, perspiciatis repudiandae? Nam, quisquam officia iste dolorem impedit laboriosam obcaecati nobis veritatis necessitatibus in aut quae ipsam sit! Asperiores, itaque totam. Maxime officia vel sed ducimus placeat, totam ut nam praesentium aspernatur dolorum et deserunt accusamus nostrum, tempora ipsa repudiandae veniam. Inventore non dignissimos esse? Consequatur expedita ea nulla incidunt quia hic, delectus in ex qui est non maiores inventore, quas deleniti fugit eaque. Quia veritatis id unde commodi laboriosam voluptatem atque iusto, nulla voluptatum et ducimus, culpa ipsum, deserunt ea mollitia! Nam consectetur vel expedita autem corrupti error iure adipisci hic incidunt explicabo, maxime placeat deleniti nulla laboriosam velit doloribus distinctio impedit culpa accusantium blanditiis eligendi dolorum totam ad. Accusantium nam necessitatibus maxime ipsam autem! Consectetur impedit fugit, asperiores odio temporibus omnis. Tempore velit consectetur, id rerum, a eaque, quo dolor possimus nihil sunt temporibus dolorum perspiciatis ex debitis dolore repudiandae. Voluptatibus omnis quasi tempora deleniti consequuntur doloremque odio blanditiis vero perferendis fugit? Unde adipisci corrupti doloremque, esse neque ipsam autem, officia consequuntur cum nobis id impedit vero eaque deleniti temporibus enim illum asperiores rerum fuga reprehenderit! Quas perspiciatis consequuntur accusantium dolore minima molestias alias suscipit ex itaque dolorum, aut, sequi at pariatur exercitationem voluptates? Quis aperiam accusantium mollitia ipsum delectus eaque commodi deleniti non. Magni voluptatum dolores corrupti officia recusandae pariatur quos ad impedit ipsam, iure rem rerum quia placeat reiciendis nemo fugit iste voluptatem voluptas quasi velit maiores eveniet! Officia, eius dolor? Nihil veritatis nemo id eligendi esse, explicabo quisquam a rem quasi iusto dolorem alias iste optio, ducimus illum reprehenderit numquam autem voluptatum aut in magni eveniet. Aliquid, aut necessitatibus? Officia impedit quae, tempora illum omnis obcaecati totam eveniet fuga ipsum ipsam modi quasi placeat aspernatur officiis eum perspiciatis sed repellat maxime, cumque sapiente quos aliquam. Ut qui maxime cumque architecto repellat in nesciunt blanditiis ab voluptatem odio similique velit soluta nobis quisquam vitae, minus, laudantium, rerum veritatis est. Autem at fugiat eveniet amet dolorum minus debitis voluptates consequatur quos quis, labore exercitationem fuga eligendi asperiores obcaecati quidem ullam atque odit soluta error. Ab atque, nesciunt aut tenetur culpa quasi nulla eveniet neque minima earum asperiores deserunt. Rerum nam nulla totam! Quae explicabo iure saepe quo voluptatem quis, eligendi optio, voluptatibus deserunt incidunt culpa officia. Ipsa provident expedita alias debitis dolore reprehenderit, magni temporibus explicabo veniam in, qui ducimus eos amet error eaque quas dolorem maxime dolores inventore praesentium voluptatibus officia sint iure. Facilis laudantium libero sapiente necessitatibus maxime exercitationem earum voluptatibus iure, quasi deserunt perspiciatis numquam voluptatum nobis et suscipit eius reiciendis repudiandae illo accusantium! Exercitationem ea sed possimus minima optio quia amet expedita iure blanditiis, dolore reprehenderit necessitatibus accusamus eaque velit, non omnis adipisci aut repellendus laborum, magnam ut ducimus dignissimos dolores! Magnam delectus soluta ipsum alias, deserunt asperiores aut. Est, ipsam molestiae, aliquid at delectus, dolor fugit asperiores dolores eligendi corrupti a aspernatur quisquam ad tempore possimus dolorum? Quia nemo neque nesciunt placeat! Accusantium debitis a sequi. Nobis provident in hic perspiciatis modi. Laborum aliquid recusandae dicta rem culpa cumque, harum nobis quas exercitationem distinctio! Itaque iusto quisquam eaque accusantium, accusamus ratione nihil enim nemo, aspernatur illum impedit placeat doloribus voluptas perferendis obcaecati modi fugit rerum eveniet eum. Similique porro vitae cupiditate illo, qui corrupti excepturi rem, reprehenderit, id expedita pariatur fugiat ea voluptatem in eius. Animi fuga explicabo dolore est. Cum possimus atque quisquam earum ipsum officiis eum a, laborum doloremque, voluptates doloribus nisi iusto tempora natus, neque quos architecto obcaecati.</Main>
            <Footer></Footer>
            <Modal
                drawal={true}
                show={openSideDrawal}
                setShow={setOpenSideDeawal}
            >
                <SideBar>
                    <SideBarLayoutLanding toggleState={toggleState} toggle={toggle}>
                        <SideLink setOpenSideDeawal={setOpenSideDeawal} toggleState={toggleState} toggle={toggle} type="landing" />
                    </SideBarLayoutLanding>
                </SideBar>
            </Modal>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    position: relative;

    img {
        width: 100%;
        height: 100%;
    }
`

const SideBar = styled.div`
    width: 60vw;
    height: 100vh;
    background: ${({ theme }) => theme.bg};
    box-shadow: 1px 1px 7px 4px rgb(0 0 0 / 82%);
`

const Header = styled.div`
    width: 100%;
    height: 93px;
    font-weight: 600;
    user-select: none;
    position: fixed;
    transition: 1s;
    z-index: 1000;
    background: ${({ theme }) => theme.bg};
    left: 0;
    top: 0;
    right: 0;
    box-shadow: -1px -1px 7px 4px rgb(0 0 0 / 82%);

    .top {
        height: 63px;
        font-weight: 600;
        display: flex;
        justify-content: space-between;
        aligin-items: center;


        padding: 10px ${({ theme }) => theme.lg_padding};
        @media (max-width: ${({ theme }) => theme.md_screen}){
            padding: 10px ${({ theme }) => theme.md_padding};
        }
        @media (max-width: ${({ theme }) => theme.sm_screen}){
            padding: 10px ${({ theme }) => theme.sm_padding};
        }

    }
    .bottom {
        height: 26px;
        padding: 0px 10px;
        font-weight: bold;
        padding: 10px ${({ theme }) => theme.lg_padding};
        @media (max-width: ${({ theme }) => theme.md_screen}){
            padding: 10px ${({ theme }) => theme.md_padding};
        }
        @media (max-width: ${({ theme }) => theme.sm_screen}){
            padding: 10px ${({ theme }) => theme.sm_padding};
        }
    }

    .theme-btn {
        margin-left: 20px;
        @media (max-width: 800px){
            display: none;
        }
    }

    .toggle {
        height: 100%;
        min-width: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        @media (min-width: 800px){
            display: none
        }
    }

    .icon {
        color: ${({ toggleState }) => toggleState ? 'var(--link-lighttheme)' : 'var(--active-link-darktheme)'};
    }

    .logo {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        font-family: cursive;
        color: ${({ theme }) => theme.title};
        text-decoration: none;
    }

    .user {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        font-size: .9rem;

        .logout {
            color: red;
            cursor: pointer;
        }
        .login {
            color: ${({ theme }) => theme.title};
            padding: 10px 5px;
            cursor: pointer;
        }

        .profile {
            padding: 10px;
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }

    .nav {
        transition: 1s;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        @media (max-width: 800px){
            display: none
        }

        .link {
            color: ${({ theme }) => theme.title};
            text-decoration: none;
            padding: 10px 4px;

            &:hover {
                opacity: .8;
            }
        }
    }
`
const Main = styled.div`
    width: 100%;
    min-height: calc(100vh - 83px);
    background-size: 80%;
    background-repeat: no-repeat;
    background-position: center;
    padding-top: 93px;
`
const Footer = styled.div`
    width: 100%;
    min-height: 63px;
`