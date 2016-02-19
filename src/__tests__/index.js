import {expect} from 'chai';
import NoSSR from '../';
import {shallow, mount} from 'enzyme';
const {describe, it} = global;

describe('no-ssr', () => {
  describe('on-server', () => {
    it('should not render children', () => {
      const MyComp = () => (<div>Hello</div>);
      const el = shallow((<NoSSR><MyComp /></NoSSR>));
      expect(el.html()).not.to.match(/Hello/);
    });
  });

  describe('on-client', () => {
    it('should render children', () => {
      const MyComp = () => (<div>Hello</div>);
      const el = mount((<NoSSR><MyComp /></NoSSR>));
      expect(el.html()).to.match(/Hello/);
    });
  });

  describe('with onSSR components', () => {
    describe('on server', () => {
      it('should show the onSSR component', () => {
        const MyComp = () => (<div>Hello</div>);
        const Loading = () => (<div>Loading...</div>);
        const el = shallow((<NoSSR onSSR={<Loading/>}><MyComp /></NoSSR>));
        expect(el.html()).to.match(/Loading/);
      });
    });

    describe('on client after mounted', () => {
      it('should show children', () => {
        const MyComp = () => (<div>Hello</div>);
        const Loading = () => (<div>Loading...</div>);
        const el = mount((<NoSSR onSSR={<Loading/>}><MyComp /></NoSSR>));
        expect(el.html()).to.match(/Hello/);
      });
    });
  });
});
