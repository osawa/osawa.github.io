(self.webpackChunkgatsby_starter_blog=self.webpackChunkgatsby_starter_blog||[]).push([[989],{8505:function(e){"use strict";e.exports=JSON.parse('{"layout":"fixed","backgroundColor":"#381818","images":{"fallback":{"src":"/static/55a73336b971b4e255ce11f7552cc8fe/d24ee/profile-pic.jpg","srcSet":"/static/55a73336b971b4e255ce11f7552cc8fe/d24ee/profile-pic.jpg 50w,\\n/static/55a73336b971b4e255ce11f7552cc8fe/64618/profile-pic.jpg 100w","sizes":"50px"},"sources":[{"srcSet":"/static/55a73336b971b4e255ce11f7552cc8fe/d4bf4/profile-pic.avif 50w,\\n/static/55a73336b971b4e255ce11f7552cc8fe/ee81f/profile-pic.avif 100w","type":"image/avif","sizes":"50px"},{"srcSet":"/static/55a73336b971b4e255ce11f7552cc8fe/3faea/profile-pic.webp 50w,\\n/static/55a73336b971b4e255ce11f7552cc8fe/6a679/profile-pic.webp 100w","type":"image/webp","sizes":"50px"}]},"width":50,"height":50}')},9535:function(e,t,a){"use strict";var l=a(7294),i=a(5444),r=a(3217);t.Z=function(){var e,t,c=(0,i.useStaticQuery)("3257411868"),n=null===(e=c.site.siteMetadata)||void 0===e?void 0:e.author,s=null===(t=c.site.siteMetadata)||void 0===t?void 0:t.social;return l.createElement("div",{className:"bio"},l.createElement(r.S,{className:"bio-avatar",layout:"fixed",formats:["AUTO","WEBP","AVIF"],src:"../images/profile-pic.jpg",width:50,height:50,quality:95,alt:"Profile picture",__imageData:a(8505)}),(null==n?void 0:n.name)&&l.createElement("p",null,"Written by ",l.createElement("strong",null,n.name)," ",(null==n?void 0:n.summary)||null," ",l.createElement("br",null),"tw:",l.createElement("a",{href:"https://twitter.com/"+((null==s?void 0:s.twitter)||"")},"@",null==s?void 0:s.twitter)))}},4870:function(e,t,a){"use strict";a.r(t);var l=a(7294),i=a(5444),r=a(9535),c=a(7198),n=a(3751);t.default=function(e){var t,a=e.data,s=e.location,o=a.markdownRemark,f=(null===(t=a.site.siteMetadata)||void 0===t?void 0:t.title)||"Title",m=a.previous,p=a.next;return l.createElement(c.Z,{location:s,title:f},l.createElement(n.Z,{title:o.frontmatter.title,description:o.frontmatter.description||o.excerpt}),l.createElement("article",{className:"blog-post",itemScope:!0,itemType:"http://schema.org/Article"},l.createElement("header",null,l.createElement("h1",{itemProp:"headline"},o.frontmatter.title),l.createElement("p",null,o.frontmatter.date)),l.createElement("section",{dangerouslySetInnerHTML:{__html:o.html},itemProp:"articleBody"}),l.createElement("hr",null),l.createElement("footer",null,l.createElement(r.Z,null))),l.createElement("nav",{className:"blog-post-nav"},l.createElement("ul",{style:{display:"flex",flexWrap:"wrap",justifyContent:"space-between",listStyle:"none",padding:0}},l.createElement("li",null,m&&!m.frontmatter.draft&&l.createElement(i.Link,{to:m.fields.slug,rel:"prev"},"← ",m.frontmatter.title)),l.createElement("li",null,p&&!p.frontmatter.draft&&l.createElement(i.Link,{to:p.fields.slug,rel:"next"},p.frontmatter.title," →")))))}}}]);
//# sourceMappingURL=component---src-templates-blog-post-js-dd10a1e9671b7da82fd2.js.map