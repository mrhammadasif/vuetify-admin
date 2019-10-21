<template>
  <vs-card class="p-5">
    <div slot="header">
      <h3>Welcome to Write Score's Data Sync Tool</h3>
    </div>
    <div>
      <p>This self-service utility allows a secure and seamless transfer data between you and us using a widely adopted data standard. You decide what data you want to transfer, the frequency and the direction of the transfer. The Ed-Fi Data Standard is a set of rules that allow (previously disconnected) educational data systems to connect. Any educational technology that's powered by Ed-Fi whether a student information system, a rostering tool, assessment software, etc. can connect with any other.</p>
      <p>Get Started in 2 easy steps...</p>
      <ul>
        <li>Step 1 - Create your connection between us and your Ed-Fi instances (Dev, QA, or Production)</li>
        <li>Step 2 - Creates the jobs (decides when you get the data)</li>
      </ul>
      <p>If you need assistance, please visit our <a
        href="https://writescore.microsoftcrmportals.com/"
        target="_blank">knowledge base</a> or email us <a href="mailto:it@writescore.com">IT@writescore.com</a>
      </p>
      <div class="p-5 logos">
        <img
          :src="require('@/assets/images/logo/edfi.png')"
          alt="">
      </div>
    </div>

  </vs-card>
</template>

<style scoped>
p,ul{
  padding-bottom: 10px;
}
.logos img {
  max-height: 80px;
  margin-right: 40px;
}
</style>
