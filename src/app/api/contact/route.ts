import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Função para enviar email
async function sendEmail(options: { name: string; email: string; message: string }) {
  // --- Configuração do Nodemailer ---
  // É ALTAMENTE RECOMENDADO usar variáveis de ambiente para as credenciais!
  // Exemplo: process.env.EMAIL_HOST, process.env.EMAIL_PORT, etc.
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.example.com', // Substitua pelo seu host SMTP
    port: parseInt(process.env.EMAIL_PORT || '587', 10), // Porta SMTP (587 para TLS, 465 para SSL)
    secure: (process.env.EMAIL_PORT || '587') === '465', // true para porta 465, false para outras
    auth: {
      user: process.env.EMAIL_USER || 'your-email@example.com', // Seu usuário de email
      pass: process.env.EMAIL_PASS || 'your-password', // Sua senha de email
    },
    // Adicione tls: { rejectUnauthorized: false } se estiver usando localhost ou tiver problemas com certificado
    // tls: {
    //   rejectUnauthorized: false
    // }
  });

  // Opções do email
  const mailOptions = {
    from: `"${options.name}" <${process.env.EMAIL_FROM || process.env.EMAIL_USER || 'noreply@example.com'}>`, // Remetente (pode ser o mesmo que o user)
    to: process.env.EMAIL_TO || 'seuemail@exemplo.com', // O email que receberá a mensagem
    replyTo: options.email, // Email do remetente para resposta
    subject: `Nova mensagem de contato de ${options.name}`,
    text: `Nome: ${options.name}\nEmail: ${options.email}\n\nMensagem:\n${options.message}`,
    html: `<p><strong>Nome:</strong> ${options.name}</p>
           <p><strong>Email:</strong> ${options.email}</p>
           <hr>
           <p><strong>Mensagem:</strong></p>
           <p>${options.message.replace(/\n/g, '<br>')}</p>`,
  };

  // Enviar o email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email enviado com sucesso:', info.messageId);
    return info;
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    throw new Error('Falha ao enviar o email.'); // Propaga o erro
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validação básica dos dados recebidos
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Todos os campos são obrigatórios.' }, { status: 400 });
    }

    console.log('Dados recebidos:', { name, email, message });

    // --- Lógica de envio de email --- 
    await sendEmail({ name, email, message });

    return NextResponse.json({ message: 'Mensagem enviada com sucesso!' });

  } catch (error: any) {
    console.error('Erro ao processar a requisição:', error);
    // Verifica se o erro é do envio de email para retornar uma mensagem mais específica
    const errorMessage = error.message === 'Falha ao enviar o email.'
      ? 'Erro ao tentar enviar o email. Verifique as configurações do servidor.'
      : 'Erro interno do servidor ao processar a mensagem.';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// // Função de exemplo para envio de email (precisa ser implementada com Nodemailer ou similar)
// // async function sendEmail(options: { to: string; subject: string; text: string; replyTo: string }) {
// //   // Configurar e usar Nodemailer aqui
// //   console.log('Enviando email com opções:', options);
// //   // throw new Error('Função sendEmail não implementada');
// // }