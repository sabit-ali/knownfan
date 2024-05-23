import React from 'react';


const AnonymousMessagingDisclaimer = () => {
    return (
        <div className=" w-full h-screen flex flex-col justify-center items-center px-34 md:px-20 py-2 bg-slate-900 text-white ">
            <h2 className=" text-[1rem]  font-bold text-orange-500">blacknote, Disclaimer</h2>
            <p className="disclaimer-text ">
                Thank you for using our anonymous messaging feature. We appreciate your interest in communicating with us while maintaining your privacy. However, it's important to understand the following terms and conditions regarding anonymous messaging:
            </p>
            <ol className="disclaimer-list">
                <li>
                    <strong className='text-red-500'>Purpose:</strong> The anonymous messaging feature is provided to facilitate open communication while protecting the identity of the sender. It's intended for constructive feedback, inquiries, or any other relevant communication.
                </li>
                <li>
                    <strong className='text-red-500'>Confidentiality:</strong> While we make every effort to maintain confidentiality, please be aware that absolute anonymity cannot be guaranteed. In certain circumstances, legal obligations or technical limitations may necessitate the disclosure of information provided through anonymous messages.
                </li>
                <li>
                    <strong className='text-red-500'>Content Responsibility:</strong> Users are solely responsible for the content of their messages. Any unlawful, offensive, or inappropriate content will be treated seriously and may result in appropriate action, including but not limited to blocking the sender and/or reporting to relevant authorities.
                </li>
                <li>
                    <strong className='text-red-500'>No Response Guarantee:</strong> We strive to respond to all messages in a timely manner, but we cannot guarantee a response to anonymous messages. If your message requires a response, consider providing contact information for a more direct communication channel.
                </li>
                <li>
                    <strong className='text-red-500'>Limited Communication:</strong> Due to the anonymous nature of the messaging feature, ongoing dialogue or follow-up may be challenging. Consider providing contact information if you require continued communication or assistance.
                </li>
                <li>
                    <strong className='text-red-500'>Data Collection:</strong> We may collect and analyze anonymous message data for the purpose of improving our services and better understanding user needs. However, we will not disclose identifiable information associated with anonymous messages without explicit consent, except as required by law.
                </li>
                <li>
                    <strong className='text-red-500'>Use at Your Own Risk:</strong> The use of the anonymous messaging feature is at your own risk. While we take measures to ensure the security and privacy of communications, we cannot guarantee absolute protection against unauthorized access or interception.
                </li>
            </ol>
            <p className="disclaimer-text">
                By using the anonymous messaging feature, you acknowledge and agree to abide by these terms and conditions. If you do not agree with any part of this disclaimer, please refrain from using the anonymous messaging feature.
                <br/><br/>
                For any questions or concerns regarding this disclaimer or our anonymous messaging feature, please contact us using alternative communication channels provided on our website.
            </p>
        </div>
    );
}

export default AnonymousMessagingDisclaimer;
