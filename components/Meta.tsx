import Head from 'next/head';

interface MetaProps {
  title?: string;
  keywords?: string;
  description?: string;
}

export const Meta = ({ title, keywords, description }: MetaProps) => {
  return (
    <Head>
      <title>{title ? title : 'InQool Interview'}</title>
      <link rel='icon' href='/favicon.ico' />

      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta charSet='utf-8' />
      <meta
        name='description'
        content={description ? description : 'Working with GitHub APIs for InQool React Interview'}
      />
      <meta
        name='keywords'
        content={keywords ? keywords : 'inqool, react, interview, github api'}
      />
    </Head>
  );
};

export default Meta;
