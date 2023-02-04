import styled from 'styled-components'
import React, { useState, useEffect } from 'react';
import Header from './header/Header';
import Aside from './aside/Aside';
import { mobileAndTabletCheck } from '../../utils/mobileAndTabletCheck';

const headerHeight = '63px'
const expandedAside = '200px'
const shrinkedAside = '40px'

export default function User({ children }) {
    const [isExpanded, setExpanded] = useState(false)
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(mobileAndTabletCheck(window))
    }, [])

    const minimize = () => {
        if (isExpanded && isMobile) {
            setExpanded(false)
        }
    }

    return (
        <Wrapper>
            <div onClick={minimize}>
                <Header
                    headerHeight={headerHeight}
                    isExpanded={isExpanded}
                    setExpanded={setExpanded}
                />
            </div>

            <Aside
                expandedAside={expandedAside}
                shrinkedAside={shrinkedAside}
                headerHeight={headerHeight}
                isExpanded={isExpanded}
                setExpanded={setExpanded}
            />

            <MainStyle
                shrinkedAside={shrinkedAside}
                headerHeight={headerHeight}
                isExpanded={isExpanded}
                onClick={minimize}
            >
                <MainContent headerHeight={headerHeight}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non corrupti ipsa fugiat, obcaecati doloremque corporis recusandae dolorum ab suscipit id earum numquam natus possimus mollitia aut omnis, dignissimos harum, ipsam maxime temporibus quis nihil. Odit atque ab hic, facere accusantium excepturi iste magni at nulla repellat, exercitationem dicta aliquid laboriosam nobis doloremque debitis, maiores sed fuga possimus. Consequuntur architecto autem ipsum adipisci quibusdam sequi nulla natus eius similique illum praesentium impedit eveniet laudantium, vitae inventore ipsa quam saepe. Quis laborum dolores beatae ea perspiciatis dicta ipsa. Quae officiis delectus fuga aperiam voluptatibus maiores unde asperiores enim eligendi perspiciatis voluptatem in blanditiis mollitia reprehenderit illo dolorem repellendus aut, repudiandae error nobis sapiente doloremque. Doloribus nobis fugit, voluptate at magni libero ipsum nesciunt dolorem modi atque nemo architecto enim iure quibusdam alias vero exercitationem voluptates! Debitis ratione sed perferendis, corrupti est facere voluptas sit nesciunt velit nisi laborum cupiditate vel quisquam vero dolorem, harum quo, exercitationem commodi possimus? Earum consectetur minus nesciunt? Modi incidunt perspiciatis non labore, sint magni ducimus, reprehenderit enim, ipsa animi cum nisi iure asperiores inventore! Neque animi totam tempora id ipsam aliquid libero laboriosam vel. Amet dolorem quisquam laudantium excepturi iure esse quis totam, odit pariatur blanditiis labore architecto nobis, nostrum quaerat nesciunt nisi magni rerum ducimus modi dicta harum eligendi sapiente. Aspernatur sequi fugit in odio fugiat ratione. Laborum doloribus est tempore obcaecati porro earum, modi quisquam aspernatur veniam, itaque rem exercitationem quod quos? In, excepturi consequatur laborum et temporibus aut nostrum. Minima dolores earum itaque debitis excepturi libero voluptatibus perferendis sapiente, reprehenderit sit! Expedita accusamus, voluptas vitae repellendus tenetur asperiores recusandae corrupti dicta exercitationem placeat error iste sunt nesciunt esse aliquam! Veniam consequuntur minima, quaerat nesciunt sed autem quae iusto suscipit molestiae illo at mollitia, amet rerum sequi quidem ut natus sunt possimus laborum dolore? Libero voluptatibus sequi nisi ipsa mollitia voluptas architecto fugiat iste amet necessitatibus aperiam, eveniet voluptatem ex eius expedita facilis, id culpa odio corrupti, deleniti ut! Aliquid vel necessitatibus in nesciunt animi, ducimus corporis porro inventore. Doloremque sunt ab sit in molestiae, nam quibusdam doloribus tempora nulla blanditiis error laborum asperiores reiciendis iure modi reprehenderit neque, corrupti accusamus aliquid. Omnis, sit nesciunt facilis, laudantium quo id, tenetur aspernatur harum tempore voluptatum unde ratione provident! Accusamus excepturi, magni ab molestias vitae soluta cumque laboriosam quo porro in, doloremque inventore odit beatae quisquam ipsa quos. Totam provident nihil dicta iure. Iure consequuntur asperiores perferendis, laudantium quae soluta pariatur, vero saepe illum quos possimus aperiam minima repudiandae corporis deleniti cum, quidem quibusdam sunt amet alias praesentium culpa excepturi expedita. Voluptatum laborum ducimus consequuntur facilis velit dolorem nisi quam libero ipsum, recusandae aliquid esse quas, tempora nemo! Nemo id, libero earum quidem ipsam eius quaerat consequuntur cum quos! Excepturi cum, corporis distinctio quis quaerat maxime esse! Iusto, pariatur iste consectetur unde dolores et modi quis doloremque maxime nisi amet rerum, eveniet voluptatibus autem officia cumque officiis tempora repellendus possimus nemo omnis facere. Ex ducimus consequatur tempora error eveniet eum quo iusto ipsa debitis impedit, accusantium, officia est quisquam beatae maxime reiciendis recusandae eaque nisi odio. Ratione odio quisquam culpa omnis, expedita inventore! Provident assumenda sint, deserunt minima, tempora rem expedita dolorum aliquam consequuntur earum illum est id aliquid corrupti fugiat! Eveniet qui culpa officia, omnis dicta eligendi provident animi ratione quae, nobis iusto atque, totam harum a perspiciatis soluta quos eum modi sint maiores. Mollitia, minus dolorum neque laborum enim rerum, perferendis eveniet quo repellat vel, amet ab maxime eius obcaecati iste? Fuga reprehenderit rem tempore iusto dignissimos. Eius harum obcaecati cupiditate tempore ullam. Enim, amet natus facere a maxime quod consequuntur eaque, vitae culpa nemo quidem impedit eligendi asperiores officiis. Voluptatem delectus minima repellat. Ratione expedita rerum dignissimos laudantium praesentium iste, velit voluptatibus magni dicta placeat ut nostrum ex, voluptatem aut doloribus explicabo! Reiciendis at suscipit dolores excepturi, velit error sed inventore neque aperiam asperiores doloremque natus ad similique, corrupti laboriosam, beatae ut eligendi? Fugiat quod eligendi, veniam mollitia pariatur sint nulla sapiente aspernatur porro tempora molestias blanditiis, dignissimos aliquid? Aliquid ipsum eos repudiandae molestiae, id reiciendis blanditiis quasi odio provident enim voluptate omnis dignissimos incidunt asperiores dicta saepe eaque quis similique autem deleniti nostrum laborum dolor commodi labore? Temporibus porro ad, ex sunt sed nam veritatis numquam in voluptates sapiente inventore consequatur vero, ratione illum repudiandae enim neque. Sed illum, tenetur vitae harum deleniti, porro excepturi ullam qui mollitia voluptatibus odio explicabo corrupti, tempore quia laborum repudiandae. Voluptatibus dolor odio reiciendis dolorem aut ipsum officia laudantium asperiores, culpa fuga numquam sint, debitis nihil mollitia sequi quis id architecto nostrum. Excepturi ullam praesentium distinctio quod. Ex sequi, ullam accusantium deleniti mollitia sed voluptas aliquam quia quidem dolor explicabo nisi repellendus omnis modi doloribus repudiandae dolorem amet, eos iusto? Iure modi totam ea porro ipsam illo repudiandae officiis iste. Cupiditate, amet laborum? Maiores, et sit voluptatum officia odit nisi optio eius totam distinctio quasi soluta odio sint asperiores, unde dolor tempore aspernatur esse? Laudantium delectus corporis eum nemo architecto repellat perspiciatis incidunt sapiente doloremque rem exercitationem, repellendus, molestiae nisi, perferendis ducimus eligendi itaque dolores. Assumenda, cupiditate consectetur quasi numquam laudantium blanditiis reprehenderit quo esse obcaecati ut nam dolore ipsa delectus laboriosam sint facilis natus placeat, odit vero. Rem incidunt veniam, laborum magnam vel temporibus cupiditate veritatis quaerat aliquam explicabo quibusdam reiciendis eius in nisi, inventore pariatur! Eum fuga facilis, voluptates ducimus distinctio tempore sunt eaque suscipit temporibus dolore nostrum nesciunt velit omnis magni. In, tempora natus tenetur aperiam aspernatur sed? At, hic non ipsam ipsum obcaecati iste veniam alias aliquam inventore repudiandae. Tenetur sint, velit fuga officiis obcaecati quidem aperiam nemo, est optio veritatis saepe provident recusandae? Iure libero magni, veritatis repudiandae, quos ullam aliquid perferendis itaque nemo a modi corrupti voluptates, tenetur provident! Numquam ut ad recusandae, ea aliquam dignissimos! Non officia excepturi nulla numquam! Numquam dicta facere quia vitae ad, non quod earum doloribus illum quasi enim ipsam recusandae ducimus necessitatibus voluptatem officiis iure natus commodi reiciendis! Perspiciatis itaque maiores voluptatibus provident unde deserunt, accusamus tempore et commodi dolore soluta explicabo, delectus facilis eveniet!
                </MainContent>
                <FooterStyle headerHeight={headerHeight}>Footer</FooterStyle>
            </MainStyle>
        </Wrapper>
    )
}


const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow-x: hidden;

`
const MainStyle = styled.div`;
    position: absolute;
    top: ${({ headerHeight }) => `calc(${headerHeight} - 2px)`};
    right: 400px;
    transition: ${({ theme }) => theme.transition};
    width:  ${({ shrinkedAside, isExpanded }) => isExpanded ? '100vw' : `calc(100vw - ${shrinkedAside})`};
    align-items: center;
    left: ${({ isExpanded }) => isExpanded ? `calc(${expandedAside})` : `calc(${shrinkedAside})`};
    min-height: ${({ headerHeight }) => `calc(100vh - ${headerHeight})`};

    @media (max-width: ${({ theme }) => theme.md_screen}){
        left: ${({ isExpanded }) => isExpanded ? `calc(${expandedAside})` : `0`};
        width: 100vw;
    }
`

const MainContent = styled.div`
    width: 100%;
    min-height: ${({ headerHeight }) => `calc(100vh - ${headerHeight} - ${headerHeight})`};
`
const FooterStyle = styled.div`
    width: 100%;
    height: ${({ headerHeight }) => headerHeight};
`