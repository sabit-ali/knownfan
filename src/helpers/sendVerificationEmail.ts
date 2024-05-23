import { resend } from "@/lib/resend";
import AWSVerifyEmail from "../../emails/Verify-email-templets";

export async function SendVerificationEmailWithResend({email,username,verifyCode}:any){
    try {
      const { data } = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: email,
        subject: 'Nextauth verification code',
        react:AWSVerifyEmail({username,verifyCode})
      });

      return Response.json({data,message:"send success"},{status:200})

    } catch (error) {
      return Response.json(error)
    }
}