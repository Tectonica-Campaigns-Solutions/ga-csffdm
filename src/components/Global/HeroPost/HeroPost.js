import React from 'react';
import { formatDate} from '../../../utils';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import ImageWrapper from '../Image/ImageWrapper';
import TagList from '../Tag/TagList';
import Link from '../Link/Link';
import Cta from '../Cta/Cta';

import './styles.scss';

const HeroPost = ({ currentPage, post }) => {
  const { title, date, tags = [], introduction, mainImage } = post;

  return (
    <div className="hero-post">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <Breadcrumb currentPage={currentPage} />
          </div>

          <div className="col-lg-6">
            <ImageWrapper image={mainImage} />
          </div>
          <div className="col-lg-6">
            <div className="post-info">
              <TagList tags={tags} />
              <span className="date">{formatDate(date)}</span>
              <Link to={post} className="title">
                {title}
              </Link>
              <p>{introduction}</p>
              <Cta cta={{ ...post }} customVariant="default" externalTitle="Read more" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroPost;
