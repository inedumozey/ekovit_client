import React from 'react'
import Copy from './CopyToClipboard';
import styled from 'styled-components'
import {
    EmailShareButton,
    FacebookShareButton,
    HatenaShareButton,
    InstapaperShareButton,
    LineShareButton,
    LinkedinShareButton,
    LivejournalShareButton,
    MailruShareButton,
    OKShareButton,
    PinterestShareButton,
    PocketShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    ViberShareButton,
    VKShareButton,
    WhatsappShareButton,
    WorkplaceShareButton,
    EmailIcon,
    FacebookIcon,
    FacebookMessengerIcon,
    HatenaIcon,
    InstapaperIcon,
    LineIcon,
    LinkedinIcon,
    LivejournalIcon,
    MailruIcon,
    OKIcon,
    PinterestIcon,
    PocketIcon,
    RedditIcon,
    TelegramIcon,
    TumblrIcon,
    TwitterIcon,
    ViberIcon,
    VKIcon,
    WeiboIcon,
    WhatsappIcon,
    WorkplaceIcon
} from "react-share";

export default function ShareLink({ url, onShare }) {
    return (
        <ShareStyle>
            <div
                style={{
                    padding: '10px',
                    display: 'flex',
                    flexWrap: 'wrap'
                }}
            >
                <div onClick={!onShare ? () => { } : () => onShare(true)} className="shareBtn">
                    <FacebookShareButton url={url}>
                        <FacebookIcon size={32} round={true} />
                    </FacebookShareButton>
                </div>

                <div onClick={!onShare ? () => { } : () => onShare(true)} className="shareBtn">
                    <LinkedinShareButton url={url}>
                        <LinkedinIcon size={32} round={true} />
                    </LinkedinShareButton>
                </div>

                {/* <div className="shareBtn">
                    <PinterestShareButton url={url}>
                        <PinterestIcon size={32} round={true} />
                    </PinterestShareButton>
                </div> */}

                <div onClick={!onShare ? () => { } : () => onShare(true)} className="shareBtn">
                    <RedditShareButton url={url}>
                        <RedditIcon size={32} round={true} />
                    </RedditShareButton>
                </div>

                <div onClick={!onShare ? () => { } : () => onShare(true)} className="shareBtn">
                    <TelegramShareButton url={url}>
                        <TelegramIcon size={32} round={true} />
                    </TelegramShareButton>
                </div>

                <div onClick={!onShare ? () => { } : () => onShare(true)} className="shareBtn">
                    <WhatsappShareButton url={url}>
                        <WhatsappIcon size={32} round={true} />
                    </WhatsappShareButton>
                </div>

                <div onClick={!onShare ? () => { } : () => onShare(true)} className="shareBtn">
                    <EmailShareButton url={url}>
                        <EmailIcon size={32} round={true} />
                    </EmailShareButton>
                </div>

                <div onClick={!onShare ? () => { } : () => onShare(true)} className="shareBtn">
                    <Copy copyText={url}>Copy</Copy>
                </div>
            </div>
        </ShareStyle>
    )
}


const ShareStyle = styled.div`
    display: flex;
    justify-content: center;
    align-itmes: center;


    .shareBtn {
        margin: 5px;
    }

`