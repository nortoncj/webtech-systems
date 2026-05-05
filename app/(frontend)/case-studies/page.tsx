import React from 'react'
import { buildMetadata } from '@/libs/seo';
import { getCaseStudies } from '@/sanity/sanity-utils';
import CaseStudiesList from '@/components/case-studies/caseStudiesList';



export const metadata = buildMetadata({
  title: `Case Studies`,
  description: `Explore our case studies showcasing successful projects and solutions across various industries. Discover how we helped businesses achieve their goals with innovative strategies and technologies.`,
  keywords: ['case studies', 'projects', 'success stories', 'client work', 'industry solutions'],
});

export const revalidate = 3600; // cache 1 hr

export default async function CaseStudiesPage() {
    const caseStudies = await getCaseStudies();
  return (
    <CaseStudiesList caseStudies={caseStudies} />
  )
}